module.exports = function(context) {
    console.log('Hook Running after the Build for Android Platform only');
	var Q = context.requireCordovaModule('q');
    var deferral = new Q.defer();

    setTimeout(function(){
      console.log('AfterBuild Hook - Android >> end');

	  // Asynchronous Operations can be done here like writing to any file or making an API call to get Production configuration and replace locally

      deferral.resolve();
	}, 3000);

    return deferral.promise;
}
