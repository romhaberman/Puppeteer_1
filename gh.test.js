let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });


  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub · Build and ship software on a single, collaborative platform · GitHub");
  }, 5000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 5000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 5000);
});


describe("Titles of other pages", () => {
  
  test("Should find the title on /features", async () => {
    await page.goto("https://github.com/features");
    const title = "div.application-main"//h1[@id='hero-section-brand-heading']"undefined";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toContain("The tools you need to build");
  }, 5000);

  test("Should find the Contact sales button on /features/security", async () => {
    await page.goto("https://github.com/features/security");
    const button = "div[class='Primer_Brand__Hero-module__Hero-actions___oH1NT'] span[class='Primer_Brand__Text-module__Text___pecHN Primer_Brand__Text-module__Text-font--mona-sans___GpzSG Primer_Brand__Text-module__Text--default___DChoE Primer_Brand__Text-module__Text--200___XAIGT Primer_Brand__Text-module__Text--weight-semibold___Ns19j Primer_Brand__Button-module__Button--label___lUBc0 Primer_Brand__Button-module__Button--label-medium___DW2TM Primer_Brand__Button-module__Button--label-primary___Leisi']";
    const actualButton = await page.$eval(button, (link) => link.textContent);
    expect(actualButton).toContain("Contact sales");
  }, 5000);

  test("Should find the title on /enterprise", async () => {
    await page.goto("https://github.com/enterprise");
    const title = "#hero-section-brand-heading";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toContain("The AI-powered");
  }, 5000);
});
