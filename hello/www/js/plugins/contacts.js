
app.on({page: 'contacts', preventClose: false, content: 'contacts.html', readyDelay: 1}, function(activity) {
	var onAction = function(evt) {
        var target = evt.target;

        if(target.getAttribute('data-order') === 'pickAContact') {
            deviceReady(function(){
				navigator.contacts.pickContact(successCallback,errorCallback);

				function successCallback(contact){
					$('#selected_contact').removeClass('hidden');
					$('#display_name').html(contact["displayName"]);
					$('#mobile_number').html(contact.phoneNumbers && contact.phoneNumbers[0] ? contact.phoneNumbers[0].value : 'N/A');
					$('#email').html(contact.email && contact.email[0] ? contact.email[0].value : 'N/A');
					$('#organisation').html(contact.organizations && contact.organizations[0] ? contact.organizations[0].name : 'N/A');
				}

				function errorCallback(message){
					alert('Error Occurred: '+message);
				}
			});
        } else {
            phonon.alert('Your order has been canceled.', 'Dear customer');
        }
    };

	activity.onCreate(function() {
		document.getElementById('pickContactBtn').on('tap',onAction);
    });
});
