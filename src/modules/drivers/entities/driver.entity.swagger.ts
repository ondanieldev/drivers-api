/**
 * @swagger
 * components:
 *   schemas:
 *     DriverEntity:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *       example:
 *         id: 594dc17d-cbd7-485f-8394-3aacdc7f9bae
 *         name: John Doe
 *
 *     DriverEntityList:
 *       type: array
 *       items:
 *         type: object
 *         $ref: '#/components/schemas/DriverEntity'
 */
