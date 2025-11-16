// Script mestre para executar todos os scrapers de receitas
import { scrapeAllRecipes as scrapePingodoce } from './scrape-pingodoce';
import { scrapeAllRecipes as scrapeContinente } from './scrape-continente';
import { scrapeAllRecipes as scrape24Kitchen } from './scrape-24kitchen';

async function scrapeAllSources() {
  console.log('🚀 Iniciando scraping de TODAS as fontes de receitas...\n');
  
  const startTime = Date.now();
  
  try {
    // 1. Continente - Sobremesas
    console.log('\n═══════════════════════════════════════════════════');
    console.log('📍 FONTE 1: Continente (Sobremesas)');
    console.log('═══════════════════════════════════════════════════\n');
    await scrapeContinente();
    
    // Delay entre fontes
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 2. 24Kitchen - Desserts
    console.log('\n═══════════════════════════════════════════════════');
    console.log('📍 FONTE 2: 24Kitchen (Desserts)');
    console.log('═══════════════════════════════════════════════════\n');
    await scrape24Kitchen();
    
    // Delay entre fontes
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 3. Pingo Doce - Sobremesas (página 1)
    console.log('\n═══════════════════════════════════════════════════');
    console.log('📍 FONTE 3: Pingo Doce (Sobremesas - Página 1)');
    console.log('═══════════════════════════════════════════════════\n');
    // Apenas página 1 para sobremesas específicas
    await scrapePingodoce(1, 1);
    
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);
    
    console.log('\n\n🎉🎉🎉 SCRAPING COMPLETO! 🎉🎉🎉');
    console.log('═══════════════════════════════════════════════════');
    console.log(`⏱️  Tempo total: ${duration} segundos`);
    console.log('✅ Todas as receitas de sobremesas foram processadas!');
    console.log('═══════════════════════════════════════════════════\n');
    
  } catch (error) {
    console.error('\n❌ Erro durante o scraping:', error);
    throw error;
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  scrapeAllSources()
    .then(() => {
      console.log('✅ Processo finalizado com sucesso!');
      process.exit(0);
    })
    .catch((err) => {
      console.error('❌ Erro fatal:', err);
      process.exit(1);
    });
}

export { scrapeAllSources };
