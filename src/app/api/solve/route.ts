import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// API Key eken Gemini AI eka initialize karanawa
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error('GEMINI_API_KEY environment variable is not set');
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: NextRequest) {
  try {
    // Frontend eken ewana image eka gannawa
    const formData = await req.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json({ error: 'Image ekak awashyai!' }, { status: 400 });
    }

    // Image eka AI ekata therenna Base64 format ekata convert karanawa
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');

    // Gemini 1.5 Pro model eka thoragannawa (meka image walata supiri)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // AI ekata dena command (prompt) eka
    const prompt = `You are an expert Sri Lankan Physics Examiner. Solve the physics problem in this image. 
    Provide the answer in a step-by-step format strictly following standard marking schemes. 
    Show equations, substitutions, and final answers with units clearly. 
    Use standard Markdown and LaTeX for equations where necessary.
    If the image is not a physics problem, politely mention that you can only solve physics problems.`;

    // AI ekata data yawala uththare enakam inna
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: image.type
        }
      }
    ]);

    const text = result.response.text();
    
    // Uththare frontend ekata yawanawa
    return NextResponse.json({ solution: text });

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: 'Wisanduma gannakota podi awulak una.' }, { status: 500 });
  }
}