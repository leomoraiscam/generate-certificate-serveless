import { join } from 'path'; 
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import dayjs from 'dayjs';
import { puppeteer,args, defaultViewport, executablePath } from 'chrome-aws-lambda'
import { document } from '../utils/dynamodbClient';

interface ICreateCertificate {
  id: string;
  name: string;
  grade: string;
}

interface ITemplate {
  id: string;
  name: string;
  grade: string;
  date: string;
  medal: string;
}

const compileFunction = async function (data:ITemplate) {
  const filePath = join(PATH, 'src','templates', 'certificate.hbs');

  const html = readFileSync(filePath, 'utf-8');

  const hand = compile(html)(data)

  return hand;

}

export const handle = async (event) => {
  const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate;

  await document.put({
    TableName: 'users_certificates',
    Item: {
      id,
      name,
      grade
    }
  }).promise()

  const medalPath = join(PATH, 'src', 'templates', 'selo.png');
  const medal = readFileSync(medalPath, 'base64')

  const data: ITemplate = {
    date: dayjs().format('DD/MM/YYYY'),
    grade,
    name,
    id,
    medal
  }

  const content = await compileFunction(data)

  const browser = await puppeter.launch({
    headless: true,
    args: args,
    defaultViewport: defaultViewport,
    executablePath: await executablePath
  })

  const page = await browser.newPage();

  await page.setContent(content)

  const IS_OFF = true;

  const pdf = await page.pdf({
    format: 'a4',
    landscape: true,
    path: IS_OFF ? 'certificate.pdf' : null,
    printBackground: true,
    preferCSSPageSize: true
  })

  await browser.close()

  return { 
    statusCode: 201,
    body: JSON.stringify({
      message: "Certificate Created"
    }),
    headers:{
      "Content-Type":"application/json"
    }
  }
}