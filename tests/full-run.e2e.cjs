const { test, expect } = require('@playwright/test');

test('пользователь проходит углублённый сценарий и получает 100%', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Начать', exact: true }).click();

  await page.getByLabel('Твоё имя').fill('Тестировщик');
  await page.getByRole('button', { name: 'Начать рабочий день' }).click();
  await page.getByRole('button', { name: 'Открыть задачу SP-214' }).click();
  await page.getByRole('button', { name: /Зафиксирую вопрос/ }).click();
  await page.getByRole('button', { name: 'Подготовить чек-лист' }).click();
  await page.getByRole('button', { name: /Проверю правило нового клиента/ }).click();
  await page.getByRole('button', { name: /Чтобы отделить ошибку настройки/ }).click();
  await page.getByRole('button', { name: /Расчёт неверен/ }).click();
  await page.getByRole('button', { name: 'Перейти к оформлению заказа' }).click();
  await page.getByRole('button', { name: /Открою Network и только потом/ }).click();
  await page.getByRole('button', { name: /Проверю количество POST-запросов/ }).click();
  await page.getByRole('button', { name: 'Проверить бизнес-эффект через SQL' }).click();
  await page.locator('#sqlInput').fill('select top 10 order_date, id, user_id from orders where user_id=77 order by order_date desc');
  await page.getByRole('button', { name: 'Выполнить запрос' }).click();
  await page.getByRole('button', { name: 'Открыть Swagger' }).click();
  await page.getByRole('button', { name: 'Сравнить фактический ответ' }).click();
  await page.getByRole('button', { name: /контракт ожидает 422/ }).click();

  await page.locator('#rTitle').fill('пр ос пр ос пр ос');
  await page.locator('#rActual').fill('аааа бббб вввв гггг дддд ееее');
  await page.locator('#rExpected').fill('фффф жжжж зззз ииии кккк');
  await page.getByRole('button', { name: 'Создать дефект' }).click();
  await expect(page.getByText(/Проверь содержание/)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Оформи главный дефект' })).toBeVisible();

  await page.locator('#rTitle').fill('Создаются два заказа при двух быстрых нажатиях');
  await page.locator('#rActual').fill('Ушли два POST-запроса и созданы заказы 1042 и 1043');
  await page.locator('#rExpected').fill('Одно пользовательское намерение создаёт только один заказ');
  await page.getByRole('button', { name: 'Создать дефект' }).click();
  await page.getByRole('button', { name: /Сначала сравню его шаги/ }).click();
  await page.getByRole('button', { name: 'Получить исправленную сборку' }).click();
  await page.getByRole('button', { name: /Ретест пройден/ }).click();
  await page.getByRole('button', { name: /Один клик, быстрый двойной клик/ }).click();
  await page.getByRole('button', { name: /Сообщить факты/ }).click();

  await expect(page.getByText('100%', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Уверенный старт' })).toBeVisible();
  await expect(page.getByText('5/5', { exact: true })).toHaveCount(4);
  await expect(page.getByText('5/5', { exact: true })).toHaveCount(4);

  await page.reload();
  await expect(page.getByRole('button', { name: 'Продолжить прохождение' })).toBeVisible();
  await page.getByRole('button', { name: 'Продолжить прохождение' }).click();
  await expect(page.getByText('100%', { exact: true })).toBeVisible();
});

test('рабочий стол открывает задачу и следующий инструмент на мобильной ширине', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/concept.html');

  await expect(page.getByRole('heading', { name: /Добро пожаловать в команду/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /ShopPoint/ })).toBeDisabled();
  await page.getByLabel('Как к тебе обращаться?').fill('7');
  await page.getByRole('button', { name: 'Сохранить имя и начать смену' }).click();
  await expect(page.getByText(/Введи имя от двух до 24 символов/)).toBeVisible();
  await page.getByLabel('Как к тебе обращаться?').fill('Тестировщик');
  await page.getByRole('button', { name: 'Сохранить имя и начать смену' }).click();
  await expect(page.getByRole('heading', { name: 'Доброе утро, Тестировщик' })).toBeVisible();
  await expect(page.getByLabel('Как к тебе обращаться?')).toBeHidden();
  await page.getByRole('button', { name: 'Принять задачу' }).click();
  await expect(page.getByText('В работе', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Открыть требования' }).click();
  await expect(page.getByRole('heading', { name: 'Промокод NEW10' })).toBeVisible();
  const prepare = page.getByRole('button', { name: /Зафиксировать правило/ });
  await expect(prepare).not.toHaveAttribute('disabled');
  await expect(prepare).toBeEnabled();
  await page.getByLabel('Уточнить критерий нового клиента').check();
  await page.getByLabel('Проверить настройку NEW10').check();
  await page.getByLabel('Сверить расчёт корзины').check();
  await page.getByLabel('Проверить защиту от повторного создания заказа').check();
  await page.reload();
  await page.getByRole('button', { name: 'Открыть требования' }).click();
  await expect(page.getByLabel('Проверить защиту от повторного создания заказа')).toBeChecked();
  await expect(prepare).toHaveClass(/is-ready/)
  await prepare.click();

  await expect(page.getByRole('button', { name: /Правила скидок/ })).toBeEnabled();
  await expect(page.getByRole('button', { name: /ShopPoint/ })).toBeDisabled();
  await expect(page.getByText('Новый клиент — пользователь без завершённых заказов. Можно проверять.')).toBeVisible();
  await page.getByRole('button', { name: /Правила скидок/ }).click();
  await page.getByRole('button', { name: /Настройка совпадает/ }).click();
  await expect(page.getByRole('button', { name: /ShopPoint/ })).toBeEnabled();
  await page.getByRole('button', { name: /ShopPoint/ }).click();
  await expect(page.getByRole('heading', { name: /корзина C-7781/ })).toBeVisible();
  await page.getByRole('button', { name: /110 BYN/ }).click();
  await expect(page.getByText(/Ожидаемый итог: 100/)).toBeVisible();
  await page.getByRole('button', { name: /Продолжить смену/ }).click();
  await expect(page.getByRole('heading', { name: 'DevTools открываем заранее' })).toBeVisible();
  await page.getByRole('button', { name: /Открою Network и только потом/ }).click();
  await page.getByRole('button', { name: /Проверю количество POST-запросов/ }).click();
  await page.getByRole('button', { name: 'Проверить бизнес-эффект через SQL' }).click();
  await page.getByRole('button', { name: 'Выполнить запрос' }).click();
  await page.getByRole('button', { name: 'Открыть Swagger' }).click();
  await page.getByRole('button', { name: 'Сравнить фактический ответ' }).click();
  await page.getByRole('button', { name: /контракт ожидает 422/ }).click();
  await page.locator('#rTitle').fill('Создаются два заказа при двух быстрых нажатиях');
  await page.locator('#rActual').fill('Ушли два POST-запроса и созданы заказы 1042 и 1043');
  await page.locator('#rExpected').fill('Одно пользовательское намерение создаёт только один заказ');
  await page.getByRole('button', { name: 'Создать дефект' }).click();
  await page.getByRole('button', { name: /Сначала сравню его шаги/ }).click();
  await page.getByRole('button', { name: 'Получить исправленную сборку' }).click();
  await page.getByRole('button', { name: /Ретест пройден/ }).click();
  await page.getByRole('button', { name: /Один клик, быстрый двойной клик/ }).click();
  await page.getByRole('button', { name: /Сообщить факты/ }).click();
  await expect(page.getByText('100%', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Уверенный старт' })).toBeVisible();
  const hasHorizontalScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(hasHorizontalScroll).toBe(false);
});

test('чек-лист и кнопка продолжают работать от касаний на мобильном устройстве', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const mobilePage = await context.newPage();

  try {
    await mobilePage.goto('/concept.html');
    await mobilePage.getByLabel('Как к тебе обращаться?').fill('Тестировщик');
    await mobilePage.getByRole('button', { name: 'Сохранить имя и начать смену' }).tap();
    await mobilePage.getByRole('button', { name: 'Принять задачу' }).tap();
    await mobilePage.getByRole('button', { name: 'Открыть требования' }).tap();

    const prepare = mobilePage.getByRole('button', { name: /Зафиксировать правило/ });
    await prepare.tap();
    await expect(mobilePage.getByText('Чтобы продолжить, отметь все четыре пункта чек-листа.')).toBeVisible();
    await expect(mobilePage.getByRole('button', { name: /Правила скидок/ })).toBeDisabled();

    await mobilePage.getByLabel('Уточнить критерий нового клиента').tap();
    await mobilePage.getByLabel('Проверить настройку NEW10').tap();
    await mobilePage.getByLabel('Сверить расчёт корзины').tap();
    await mobilePage.getByLabel('Проверить защиту от повторного создания заказа').tap();

    await expect(mobilePage.getByText('Чек-лист готов. Можно продолжать.')).toBeVisible();
    await expect(prepare).toHaveClass(/is-ready/)
    await expect(prepare).toBeEnabled();
    await prepare.tap();
    await expect(mobilePage.getByRole('button', { name: /Правила скидок/ })).toBeEnabled();
  } finally {
    await context.close();
  }
});

test('SQL-упражнение отклоняет SELECT * и принимает эквивалентный ограниченный запрос', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('qa-first-day-v2', JSON.stringify({
      step: 15,
      name: 'QA',
      score: 11,
      decisions: { requirement: 3, priority: 3, promoSource: 1, discount: 4 },
      bugs: [],
      hints: 0,
      report: { title: '', actual: '', expected: '' },
      started: true
    }));
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Продолжить прохождение' }).click();

  await page.locator('#sqlInput').fill('SELECT * FROM orders WHERE user_id = 77 ORDER BY order_date DESC');
  await page.getByRole('button', { name: 'Выполнить запрос' }).click();
  await expect(page.getByText('Запрос пока не подходит')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Открыть Swagger' })).toHaveCount(0);

  await page.locator('#sqlInput').fill('SELECT TOP 1 id, user_id, order_date FROM orders WHERE user_id=77 ORDER BY order_date DESC');
  await page.getByRole('button', { name: 'Выполнить запрос' }).click();
  await expect(page.getByText(/используй SELECT TOP 2–10/)).toBeVisible();

  await page.locator('#sqlInput').fill('select top (10) order_date, id, user_id from orders where user_id=77 order by order_date desc');
  await page.getByRole('button', { name: 'Выполнить запрос' }).click();
  await expect(page.getByText('Бизнес-эффект подтверждён')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Открыть Swagger' })).toBeVisible();
});

test('основной сценарий предупреждает, если браузер запрещает сохранение прогресса', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = function () {
      throw new DOMException('Storage is disabled', 'QuotaExceededError');
    };
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Начать', exact: true }).click();
  await page.getByLabel('Твоё имя').fill('Тестировщик');
  await page.getByRole('button', { name: 'Начать рабочий день' }).click();
  await expect(page.getByRole('heading', { name: 'Сборка готова к тестированию' })).toBeVisible();
  await expect(page.getByText(/доступен только до закрытия вкладки/)).toBeVisible();
});

test('неверная оценка корзины получает объяснение и переносит отрицательный балл', async ({ page }) => {
  await page.goto('/concept.html');
  await page.getByLabel('Как к тебе обращаться?').fill('Тестировщик');
  await page.getByRole('button', { name: 'Сохранить имя и начать смену' }).click();
  await page.getByRole('button', { name: 'Принять задачу' }).click();
  await page.getByRole('button', { name: 'Открыть требования' }).click();
  await page.getByLabel('Уточнить критерий нового клиента').check();
  await page.getByLabel('Проверить настройку NEW10').check();
  await page.getByLabel('Сверить расчёт корзины').check();
  await page.getByLabel('Проверить защиту от повторного создания заказа').check();
  await page.getByRole('button', { name: /Зафиксировать правило/ }).click();
  await page.getByRole('button', { name: /Правила скидок/ }).click();
  await page.getByRole('button', { name: /Настройка совпадает/ }).click();
  await page.getByRole('button', { name: /ShopPoint/ }).click();
  await page.getByRole('button', { name: /108 BYN/ }).click();
  await expect(page.getByText(/Ожидаемый итог — 110 BYN/)).toBeVisible();
  await page.getByRole('button', { name: /Продолжить смену/ }).click();

  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('qa-first-day-v2')));
  expect(saved.step).toBe(11);
  expect(saved.decisions.discount).toBe(-2);
  expect(saved.score).toBe(5);
});
