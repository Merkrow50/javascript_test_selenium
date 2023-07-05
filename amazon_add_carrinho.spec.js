const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function test() {
  // Configuração do navegador Chrome
  const options = new chrome.Options();
  options.addArguments('--start-maximized');

  // Inicialização do driver do Selenium
  const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

  try {
    // Acessar o site da Amazon
    await driver.get('https://www.amazon.com');

    // Pesquisar por "Alexa"
    const searchInput = await driver.findElement(By.id('twotabsearchtextbox'));
    await searchInput.sendKeys('Alexa', Key.RETURN);

    // Esperar pelo resultado da pesquisa
    await driver.wait(until.titleContains('Amazon.com'), 5000);

    // Clicar no primeiro resultado da pesquisa
    const firstResult = await driver.findElement(By.css('[data-component-type="s-search-result"] a'));
    await firstResult.click();

    // Aguardar a página do produto
    await driver.wait(until.titleContains('Amazon.com:'), 5000);

    // Adicionar ao carrinho
    const addToCartButton = await driver.findElement(By.id('add-to-cart-button'));
    await addToCartButton.click();

    // Aguardar a página de confirmação do carrinho
    await driver.wait(until.titleContains('Amazon.com Shopping Cart'), 5000);

    // Verificar se a Alexa foi adicionada ao carrinho
    const cartItemCount = await driver.findElement(By.id('nav-cart-count'));
    const itemCountText = await cartItemCount.getText();
    const itemCount = parseInt(itemCountText);
    if (itemCount > 0) {
      console.log('Alexa foi adicionada ao carrinho com sucesso!');
    } else {
      console.log('Falha ao adicionar a Alexa ao carrinho.');
    }
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  } finally {
    // Fechar o navegador
    await driver.quit();
  }
})();
