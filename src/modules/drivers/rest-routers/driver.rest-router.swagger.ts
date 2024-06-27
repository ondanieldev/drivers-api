/**
 * @swagger
 * tags:
 *   name: Drivers
 * /drivers:
 *   post:
 *     summary: Create a new driver
 *     tags: [Drivers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDriverDto'
 *     responses:
 *       201:
 *         description: The created driver.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DriverEntity'
 *
 *   get:
 *     summary: Read driver list
 *     tags: [Drivers]
 *     parameters:
 *       - in: query
 *         name: ReadDriverListDto
 *         schema:
 *           $ref: '#/components/schemas/ReadDriverListDto'
 *     responses:
 *       200:
 *         description: The driver list.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DriverEntityList'
 *
 * /drivers/{id}:
 *   get:
 *     summary: Read a driver by id
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The driver id
 *     responses:
 *       200:
 *         description: The driver.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DriverEntity'
 *
 *   put:
 *     summary: Update a driver
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The driver id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDriverDto'
 *     responses:
 *       200:
 *         description: The updated driver.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DriverEntity'
 *
 *   delete:
 *     summary: Delete a driver
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The driver id
 *     responses:
 *       204:
 *         description: The driver was deleted.
 */
