# cloud

github: https://github.com/wrannaman/Cloud.git

Tests
Note, all tests with hard coded ID's have to be replaced with actual id's of real item id's
otherwise you will get a not found error.
Users delete function deletes all products associated with that user as well. This is not the
case for product deletion. It would not make sense to delete the user account when deleting a product.

To run:
  - install node
  - install npm
  - $ npm i
  - $ sails lift
  - visit localhost:1337
