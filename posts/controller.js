angular.module('myApp', [])
    .controller('FirstController', function ($scope, $http) {
        $scope.posts = [];
        $scope.newPost = {};

        
        $http.get('https://jsonplaceholder.typicode.com/posts')
            .then(function (data) {
                $scope.posts = data.data;
            })
            .catch(function (err) {
                console.log(err);
            });


        $scope.addPost = function () {
            $http.post('https://jsonplaceholder.typicode.com/posts', {
                title: $scope.newPost.title,
                body: $scope.newPost.body,
                userId: 1
            })
                .then(function (data, status, headers, config) {
                    $scope.posts.push($scope.newPost);
                    $scope.newPost = {};
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        $scope.editPost = {};

        $scope.editGet = function (post) {
            $scope.editPost = {};
            $scope.editPost = angular.copy(post);
        }


        $scope.editPut = function (post) {
            console.log(post);
            $http.put('https://jsonplaceholder.typicode.com/posts/' + post.id, {
                title: post.title,
                body: post.body,
                userId: post.userId
            })
                .then(function (response) {
                    let index = $scope.posts.findIndex(p => p.id === post.id);
                    if (index !== -1) {
                        $scope.posts[index] = response.data;
                        if (response.status === 200){
                            alert("Post editado correctamente");
                        }
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        $scope.deletePost = function (post) {
            $http.delete('https://jsonplaceholder.typicode.com/posts/' + post.id)
                .then(function (response) {
                    let index = $scope.posts.findIndex(item => item.id === post.id);
                    if (index !== -1) $scope.posts.splice(index, 1);
                    if (response.status === 200){
                        alert("Post eliminado correctamente");
                    }
                })
                .catch(function (err) {
                    console.log(err);
                }); 
        }
    });