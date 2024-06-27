/**
 * @swagger
 * tags:
 *   name: Automobiles Usages
 * /automobiles/usages/start:
 *   post:
 *     summary: Start an automobile usage
 *     tags: [Automobiles Usages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StartAutomobileUsageDto'
 *     responses:
 *       201:
 *         description: The automobile usage.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AutomobileUsageEntity'
 *
 * /automobiles/usages:
 *   get:
 *     summary: Read automobile usage list
 *     tags: [Automobiles Usages]
 *     responses:
 *       200:
 *         description: The automobile usage list.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AutomobileUsageEntityList'
 *
 * /automobiles/usages/finish/{id}:
 *   post:
 *     summary: Finish an automobile usage
 *     tags: [Automobiles Usages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The automobile usage id
 *     responses:
 *       200:
 *         description: The automobile usage.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AutomobileUsageEntity'
 */
