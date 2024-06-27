/**
 * @swagger
 * components:
 *   schemas:
 *     AutomobileEntity:
 *       type: object
 *       required:
 *         - id
 *         - brand
 *         - color
 *         - licensePlate
 *       properties:
 *         id:
 *           type: string
 *         brand:
 *           type: string
 *         color:
 *           type: string
 *         licensePlate:
 *           type: string
 *       example:
 *         id: 594dc17d-cbd7-485f-8394-3aacdc7f9bae
 *         brand: Toyota
 *         color: white
 *         licensePlate: ABC-1234
 *
 *     AutomobileEntityList:
 *       type: array
 *       items:
 *         type: object
 *         $ref: '#/components/schemas/AutomobileEntity'
 */
