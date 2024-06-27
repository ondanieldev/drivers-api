/**
 * @swagger
 * tags:
 *   name: Automobiles
 * /automobiles:
 *   post:
 *     summary: Create a new automobile
 *     tags: [Automobiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAutomobileDto'
 *     responses:
 *       201:
 *         description: The created automobile.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AutomobileEntity'
 *
 *   get:
 *     summary: Read automobile list
 *     tags: [Automobiles]
 *     parameters:
 *       - in: query
 *         name: ReadAutomobileListDto
 *         schema:
 *           $ref: '#/components/schemas/ReadAutomobileListDto'
 *     responses:
 *       200:
 *         description: The automobile list.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AutomobileEntityList'
 *
 * /automobiles/{id}:
 *   get:
 *     summary: Read an automobile by id
 *     tags: [Automobiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The automobile id
 *     responses:
 *       200:
 *         description: The automobile.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AutomobileEntity'
 *
 *   put:
 *     summary: Update an automobile
 *     tags: [Automobiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The automobile id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAutomobileDto'
 *     responses:
 *       200:
 *         description: The updated automobile.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AutomobileEntity'
 *
 *   delete:
 *     summary: Delete an automobile
 *     tags: [Automobiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The automobile id
 *     responses:
 *       204:
 *         description: The automobile was deleted.
 */
