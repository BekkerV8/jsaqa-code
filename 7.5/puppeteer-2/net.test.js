const { clickElement, putText, getText } = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Booking a ticket", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test("Booking one ticket'", async () => {
    await clickElement(page, ".page-nav > a:nth-child(1)");
    await clickElement(page, "a.movie-seances__time");
    await clickElement(page, ".buying-scheme__row > span:nth-child(19)");
    await clickElement(page, "button.acceptin-button");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "p.ticket__hint");
    expect(actual).toContain(
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
  });

  test("Booking two ticket'", async () => {
    await clickElement(page, ".page-nav > a:nth-child(3)");
    await clickElement(page, "a.movie-seances__time");
    await clickElement(page, ".buying-scheme__row > span:nth-child(4)");
    await clickElement(page, ".buying-scheme__row > span:nth-child(9)");
    await clickElement(page, "button.acceptin-button");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "p.ticket__hint");
    expect(actual).toContain(
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
  });

  test("Should not booking tickt", async () => {
    await clickElement(page, ".page-nav > a:nth-child(1)");
    await clickElement(page, "a.movie-seances__time");
    await clickElement(page, ".buying-scheme__row > span:nth-child(3)");
    await clickElement(page, "button.acceptin-button");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "p.ticket__hint");
    expect(actual).toContain(
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await clickElement(page, ".page-nav > a:nth-child(1)");
    await clickElement(page, "a.movie-seances__time");
    await clickElement(page, ".buying-scheme__row > span:nth-child(3)");
    expect(async () => {
      await clickElement(page, ".buying-scheme__row > span:nth-child(3)");
    }).toThrow();
  });
});
