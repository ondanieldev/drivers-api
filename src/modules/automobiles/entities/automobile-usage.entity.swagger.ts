/**
 * @swagger
 * components:
 *   schemas:
 *     AutomobileUsageEntity:
 *       type: object
 *       required:
 *         - id
 *         - automobileId
 *         - driverId
 *         - reason
 *         - startedAt
 *       properties:
 *         id:
 *           type: string
 *         automobileId:
 *           type: string
 *         driverId:
 *           type: string
 *         finishedAt:
 *           type: string
 *           format: date-time
 *         reason:
 *           type: string
 *         startedAt:
 *           type: string
 *           format: date-time
 *         automobile:
 *           type: object
 *           $ref: '#/components/schemas/AutomobileEntity'
 *         driver:
 *           type: object
 *           $ref: '#/components/schemas/DriverEntity'
 *       example:
 *         id: 594dc17d-cbd7-485f-8394-3aacdc7f9bae
 *         automobileId: Toyota
 *         driverId: white
 *         finishedAt: 2024-06-27T15:29:34.561Z
 *         reason: ABC-1234
 *         startedAt: 2024-06-27T15:27:19.803Z
 *         automobile:
 *           id: 594dc17d-cbd7-485f-8394-3aacdc7f9bae
 *           brand: Toyota
 *           color: white
 *         driver:
 *          id: 594dc17d-cbd7-485f-8394-3aacdc7f9bae
 *          name: John Doe
 *
 *     AutomobileUsageEntityList:
 *       type: array
 *       items:
 *         type: object
 *         $ref: '#/components/schemas/AutomobileUsageEntity'
 */
