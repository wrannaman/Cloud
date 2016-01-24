# cloud

Tests
Note, all tests with hard coded ID's have to be replaced with actual id's of real item id's
otherwise you will get a not found error.
Users delete function deletes all products associated with that user as well. This is not the
case for product deletion. It would not make sense to delete the user account when deleting a product.

Users Test

'get /3/users'                        : 'UsersController.getAll',
'get /3/users/:id'                    : 'UsersController.getOne',
'post /3/users'                       : 'UsersController.create',
'put /3/users'                        : 'UsersController.update',
'delete /3/users/:id'                 : 'UsersController.delete',



 - GET ALL USERS : curl http://localhost:1337/3/users
 - GET SINGLE USER: curl http://localhost:1337/3/users/56a3f16affbcb1cb0a3adfa8
 - CREATE: curl -d "firstName=foobar&lastName=12345&email=blablabla@gmail.com&password=submit" http://localhost:1337/users
 - UPDATE:  curl -X PUT -H "Cache-Control: no-cache"  -d "id=56a3f16affbcb1cb0a3adfa8&firstName=foobar&lastName=12345&email=blablabla@gmail.com&password=succcbmit" 'htp://localhost:1337/3/users'
 - DELETE: curl -X DELETE -H "Cache-Control: no-cache" 'http://localhost:1337/3/users/56a3f16affbcb1cb0a3adfa8'


 Products Test

 'get  /3/products'                    : 'ProductsController.all' ,
 'get  /3/products/:id'                : 'ProductsController.one' ,
 'post /3/products'                    : 'ProductsController.create',
 'put /3/products/update'              : 'ProductsController.update',
 'delete /3/products/delete'           : 'ProductsController.delete',




  - GET ALL PRODUCTS (returns the user that the product is associated with as well) : curl http://localhost:1337/3/products
  - GET SINGLE PRODUCT: curl http://localhost:1337/3/products/5693c551ca83bd1d044ea68f
  - CREATE: curl -d "name=thing43&user=56a3f25cffbcb1cb0a3adfa9&cost=5.5&quantity=5&gender=male&season=winter" http://localhost:1337/products
  - UPDATE:  curl -X PUT -H "Cache-Control: no-cache"  -d "name=thing3&cost=5.5&quantity=5&gender=male&season=winter,spring&user=56a3f25cffbcb1cb0a3adfa9&color=#eb6a5a&id=56a4125f35f65fdc0d99f764" 'http://localhost:1337/3/products'
  - DELETE: curl -X DELETE -H "Cache-Control: no-cache" 'http://localhost:1337/3/products/5693c68187c8442a046dc60b'
