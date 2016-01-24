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
