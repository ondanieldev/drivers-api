/**
 * @swagger
 * components:
 *   schemas:
 *     CreateAutomobileDto:
 *       type: object
 *       required:
 *         - brand
 *         - color
 *         - licensePlate
 *       properties:
 *         brand:
 *           type: string
 *         color:
 *           type: string
 *         licensePlate:
 *           type: string
 *       example:
 *         brand: Toyota
 *         color: white
 *         licensePlate: ABC-1234
 *
 *     UpdateAutomobileDto:
 *       type: object
 *       required:
 *         - brand
 *         - color
 *         - licensePlate
 *       properties:
 *         brand:
 *           type: string
 *         color:
 *           type: string
 *         licensePlate:
 *           type: string
 *       example:
 *         brand: Toyota
 *         color: white
 *         licensePlate: ABC-1234
 *
 *     ReadAutomobileListDto:
 *       type: object
 *       properties:
 *         brand:
 *           type: string
 *         color:
 *           type: string
 *       example:
 *         brand: Toyota
 *         color: white
 */
