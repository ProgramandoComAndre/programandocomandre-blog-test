import {test , expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test("Devem mostrar titulo da pagina", async ({page}) => {
    
    await page.goto("https://programandocomandre.blogspot.pt/");
    const title = await page.title();
    const sanitizedTitle = title.replace("é", "e");
    
    expect(sanitizedTitle).toContain("Programando com Andre");
})

test("should not have any automatically detectable accessibility issues", async ({ page }, testInfo) => {
    await page.goto("https://programandocomandre.blogspot.pt/");
    const acessibilityScan = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    testInfo.attach("accessibility-scan-results", {
        contentType: "application/json",
        body: JSON.stringify(acessibilityScan, null, 2)
    })
    expect(acessibilityScan.violations).toEqual([])
})
