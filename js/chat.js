var config = {
    apiKey: "AIzaSyBhmHo7z28M_ewhjULkj8sMW1UBKMCntBg",
    authDomain: "messages-7d56e.firebaseapp.com",
    databaseURL: "https://messages-7d56e.firebaseio.com",
    projectId: "messages-7d56e",
    storageBucket: "messages-7d56e.appspot.com",
    messagingSenderId: "434052306453"
  };

  firebase.initializeApp(config);

  const member_id = "Üye " + Math.floor(Math.random() * 100);
  const channel_id = 1;
  const now = Date.now();

  var ChannelMessages = firebase.database().ref("channels/" + channel_id);

  ChannelMessages
    .orderByChild("now") // Bu satırlar sayfa yenilenince
    .startAt(now)       // eski yazışmaların listelenmemesi için yazılmıştır.
    .on('child_added', function(snapshot) { // Yeni eklenen satır listelensin diye yazılmıştır
        document.getElementById("messages").innerHTML += '<p>' + snapshot.val().member_id + ' : ' + snapshot.val().content+'</p>';
    }); 

  function send()
  {
    var content = $("#name" ).val();
    var MemberMessage = firebase.database().ref('channels/' + channel_id);

    MemberMessage.push(
      {
        content:content,
        member_id:member_id,
        now: Date.now(),
      }
    );

    $("#name" ).val("");
  }