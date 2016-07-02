function contacts(){
	document.addEventListener('deviceready',onDeviceReady,false);
	function onDeviceReady(){
		console.log('Device is Ready');
		window.pickAContact = pickAContact;

		function pickAContact() {
			navigator.contacts.pickContacts(successCallback,errorCallback);

			function successCallback(contact){
				$('#selected_contact').html('Selected Contact: <br>'+JSON.stringify());
			}

			function errorCallback(message){
				alert('Error Occurred: '+message);
			}
		}
	}
}
