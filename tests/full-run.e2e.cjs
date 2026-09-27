const { test, expect } = require('@playwright/test');

test('пользователь проходит основной сценарий и получает 100%', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Начать', exact: true }).click();

  await page.getByLabel('Твоё имя').fill('Тестировщик');
  await page.getByRole('button', { name: 'Начать рабочий день' }).click();
  await page.getByRole('button', { name: 'Открыть требования' }).click();
  await page.getByRole('button', { name: 'Уточню критерий у менеджера' }).click();
  await page.getByRole('button', { name: 'Составить проверки' }).click();
  await page.getByRole('button', { name: 'Главный путь: товар → корзина → промокод → заказ' }).click();
  await page.getByRole('button', { name: /Да\. Правильный итог/ }).click();
  await page.getByRole('button', { name: 'Оформить заказ и продолжить' }).click();
  await page.getByRole('button', { name: 'Открою Network и проверю запросы' }).click();
  await page.getByRole('button', { name: 'Проверить данные через SQL' }).click();
  await page.getByRole('button', { name: 'Выполнить запрос' }).click();
  await page.getByRole('button', { name: 'Перейти к API' }).click();
  await page.getByRole('button', { name: '400 Bad Request' }).click();

  await page.locator('#rTitle').fill('Создаются два заказа при двойном нажатии');
  await page.locator('#rActual').fill('Отправлены два POST-запроса и созданы две записи');
  await page.locator('#rExpected').fill('Создаётся только один заказ и одна запись');
  await page.getByRole('button', { name: 'Создать дефект' }).click();
  await page.getByRole('button', { name: 'Приложу два запроса, две записи БД и точные шаги' }).click();
  await page.getByRole('button', { name: 'Перейти к решению о релизе' }).click();
  await page.getByRole('button', { name: 'Отложить решение до исправления, ретеста и короткого регресса' }).click();

  await expect(page.getByText('100%', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Уверенный старт' })).toBeVisible();
  await expect(page.getByText('5/5', { exact: true })).toHaveCount(4);

  await page.reload();
  await expect(page.getByRole('button', { name: 'Продолжить прохождение' })).toBeVisible();
  await page.getByRole('button', { name: 'Продолжить прохождение' }).click();
  await expect(page.getByText('100%', { exact: true })).toBeVisible();
});
