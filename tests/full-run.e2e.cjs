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
  await expect(page.getByText('5/5', { exact: true })).toHaveCount(4);

  await page.reload();
  await expect(page.getByRole('button', { name: 'Продолжить прохождение' })).toBeVisible();
  await page.getByRole('button', { name: 'Продолжить прохождение' }).click();
  await expect(page.getByText('100%', { exact: true })).toBeVisible();
});

