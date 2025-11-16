import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as Blob;

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Convert blob to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // Call OpenAI Vision API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analise esta imagem e identifique TODOS os ingredientes alimentares visíveis. Liste apenas os nomes dos ingredientes em português de Portugal, separados por vírgula. Se não houver ingredientes visíveis, responda "Nenhum ingrediente detectado". Seja específico e preciso.',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    const content = response.choices[0]?.message?.content || '';
    
    // Parse the response to extract ingredients
    let ingredients: string[] = [];
    
    if (content && content !== 'Nenhum ingrediente detectado') {
      // Split by comma and clean up
      ingredients = content
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);
    }

    return NextResponse.json({
      ingredients: ingredients.length > 0 ? ingredients : ['Nenhum ingrediente detectado'],
    });

  } catch (error: any) {
    console.error('Error analyzing image:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image', details: error.message },
      { status: 500 }
    );
  }
}
