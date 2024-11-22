import { Builder, By, Key, until } from "selenium-webdriver";

async function nuevoEstudiante() {
  // Configura el WebDriver para Chrome
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navega a una URL
    await driver.get("http://localhost:5173/");
    // Espera a encontrar el enlace de acceso
    await driver.wait(until.elementLocated(By.linkText("Acceso")), 10000);
    await driver.findElement(By.linkText("Acceso")).click();
    // Encuentra el elemento para ingresar el usuario
    await driver.findElement(By.id("username")).click();
    await driver.actions().sendKeys("root", Key.TAB).perform();
    await driver.actions().sendKeys("root", Key.ENTER).perform();
    // Espera volver a la página inicial
    await driver.wait(until.titleIs("Home"), 10000);
    // Encuentra el enlace de Apoderados
    await driver.wait(until.elementLocated(By.linkText("Apoderados")), 10000);
    await driver.findElement(By.linkText("Apoderados")).click();
    // Espera a que cargue la página
    await driver.wait(until.titleIs("Apoderados"), 10000);
    // Encuentra al primer Apoderado en la lista
    await driver.wait(until.elementLocated(By.css(".apoderado")), 10000);
    await driver.findElement(By.css(".apoderado")).click();
    // Encuentra el botón para agregar un nuevo Estudiante
    await driver.findElement(By.id("nuevo-estudiante"), 10000);
    await driver.findElement(By.id("nuevo-estudiante")).click();
    // Ingresa los datos
    await driver.actions().sendKeys("Saúl", Key.TAB).perform();
    await driver.actions().sendKeys("Pablo", Key.TAB).perform();
    await driver.actions().sendKeys("", Key.TAB).perform();
    await driver.actions().sendKeys("Good", Key.TAB).perform();
    await driver.actions().sendKeys("Red", Key.TAB).perform();
    await driver.actions().sendKeys("23.267.148-2", Key.TAB).perform();
    await driver.actions().sendKeys("02152005", Key.ENTER).perform();
    // Termina
  } finally {
    // await driver.close();
  }
}

nuevoEstudiante();
