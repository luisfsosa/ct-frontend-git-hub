var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var config = {
	username: "quo@quo.volumens.com",
	password: "(;nvVh[vZ=ZZE3z4", // optional, prompted if none given
	host: "quo.volumens.com",
	port: 21,
	localRoot: __dirname + "/dist",
	remoteRoot: "/",
    //include: ['build/version.txt'],
    continueOnError: true,
	exclude: ['.git', '.idea', 'tmp/*', 'build/*']
}
	
ftpDeploy.deploy(config, function(err) {
	if (err) console.log(err)
	else console.log('finished');
});

ftpDeploy.on('uploaded', function(data) {
	console.log(data);         // same data as uploading event
});