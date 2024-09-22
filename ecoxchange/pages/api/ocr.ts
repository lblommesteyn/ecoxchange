import { NextApiRequest, NextApiResponse } from 'next';
import Tesseract from 'tesseract.js';
//import formidable from "formidable";
import fs from 'fs';
import { Cerebras } from '@cerebras/cerebras_cloud_sdk';

export const config = {
  api: {
    bodyParser: false,
  },
};
/* 
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        res.status(500).json({ error: 'Failed to parse form data', details: err.message });
        return;
      }
      try {
        const file = (files.document as formidable.File[])[0];
        const filePath = file.filepath;
        try {
          const result = await Tesseract.recognize(
            fs.readFileSync(filePath),
            'eng',
            {
              logger: (m) => console.log(m),
            }
          );
          const text = result.data.text;
          const { type, value } = await getDocumentDetails(text);
          res.status(200).json({ text, type, value });
        } catch (error) {
          console.error('Error processing document with Tesseract:', error);
          res.status(500).json({ error: 'Failed to process the document', details: error.message });
        }
      } catch (fileError) {
        console.error('Error reading file:', fileError);
        res.status(500).json({ error: 'Error handling the uploaded file', details: fileError.message });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

const getDocumentDetails = async (text: string): Promise<{ type: string, value: number }> => {
  const client = new Cerebras({
    apiKey: process.env.CEREBRAS_API_KEY,
  });

  const response = await client.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `Analyze the following document text and determine its type and value:\n\n${text}\n\nReturn the type and a numerical value representing the worth.`,
      },
    ],
    model: 'llama3.1-8b',
  });

  const responseText = response.choices[0].message.content.trim();
  const [type, valueStr] = responseText.split('\n');
  const value = parseFloat(valueStr);

  return {
    type: type || 'Unknown',
    value: isNaN(value) ? 0 : value,
  };
};

export default handler; */