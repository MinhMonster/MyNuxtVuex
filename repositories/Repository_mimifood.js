
// Mimi Food
import mimiFoodProducts from '~/repositories/admin/mimifood/products'

export default ($api_food) => ({

  mimiFoodProducts: mimiFoodProducts($api_food),

})
