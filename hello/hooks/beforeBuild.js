module.exports = function(context) {
    console.log('Hook Running before the Build');
	var Q = context.requireCordovaModule('q');
    var deferral = new Q.defer();

    setTimeout(function(){
      console.log('BeforeBuild Hook >> end');

	  // Asynchronous Operations can be done here like writing to any file or making an API call to get Production configuration and replace locally

      deferral.resolve();
	}, 3000);

    return deferral.promise;
}
