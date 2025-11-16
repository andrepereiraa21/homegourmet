import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { ingredients } = await request.json();

    if (!ingredients || !Array.isArray(ingredients)) {
      return NextResponse.json(
        { error: 'Invalid ingredients array' },
        { status: 400 }
      );
    }

    // Call OpenAI to get nutritional information
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em nutrição. Forneça informações nutricionais aproximadas para ingredientes alimentares em formato JSON.',
        },
        {
          role: 'user',
          content: `Para cada um dos seguintes ingredientes, forneça informações nutricionais aproximadas por 100g em formato JSON: ${ingredients.join(', ')}. 
          
          Responda APENAS com um array JSON válido no seguinte formato:
          [
            {
              "name": "nome do ingrediente",
              "quantity": 100,
              "unit": "g",
              "calories": número,
              "protein": número,
              "carbs": número,
              "fat": número,
              "confidence": 0.85
            }
          ]
          
          Não adicione texto extra, apenas o JSON.`,
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content || '{}';
    
    try {
      const data = JSON.parse(content);
      
      // Ensure we have an ingredients array
      const ingredientsData = data.ingredients || [];
      
      return NextResponse.json({
        ingredients: ingredientsData,
      });
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      
      // Fallback: create basic structure
      const fallbackIngredients = ingredients.map((name: string) => ({
        name,
        quantity: 100,
        unit: 'g',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        confidence: 0.5,
      }));
      
      return NextResponse.json({
        ingredients: fallbackIngredients,
      });
    }

  } catch (error: any) {
    console.error('Error getting ingredient info:', error);
    
    // Fallback response
    const { ingredients } = await request.json();
    const fallbackIngredients = ingredients.map((name: string) => ({
      name,
      quantity: 100,
      unit: 'g',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      confidence: 0.5,
    }));
    
    return NextResponse.json({
      ingredients: fallbackIngredients,
    });
  }
}
