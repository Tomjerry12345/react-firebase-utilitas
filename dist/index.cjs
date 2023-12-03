var e=require("firebase/app"),t=require("firebase/auth"),r=require("firebase/storage"),n=require("firebase/firestore");function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o.apply(this,arguments)}module.exports=function(i){var c=e.initializeApp(i),a=t.getAuth(c),u=r.getStorage(c),s=n.getFirestore(c),f=function(e,t){return n.deleteDoc(n.doc(s,e,t))},h=function(e,r){return t.signInWithEmailAndPassword(a,e,r)},l=function(){return new Promise(function(e,t){a.onAuthStateChanged(function(t){e(t||null)})})};return{createUser:function(e,r){try{return Promise.resolve(t.createUserWithEmailAndPassword(a,e,r))}catch(e){return Promise.reject(e)}},deleteUserServices:function(e,r,n,o){return new Promise(function(i,c){try{return Promise.resolve(h(r,n)).then(function(){a.onAuthStateChanged(function(r){null!==r&&t.deleteUser(r).then(function(){f(e,o),i(!0)}).catch(function(e){console.error(e),i(!1)})})})}catch(e){return Promise.reject(e)}})},uploadImage:function(e){return new Promise(function(t,n){var o=r.ref(u,"images/"+e.name),i=r.uploadBytesResumable(o,e);i.on("state_changed",function(e){console.log("Upload is "+e.bytesTransferred/e.totalBytes*100+"% done")},function(e){n(e)},function(){r.getDownloadURL(i.snapshot.ref).then(function(e){t(e)})})})},addData:function(e,t){return n.addDoc(n.collection(s,e),o({},t,{timestamp:n.serverTimestamp()}))},addDataSpecifict:function(e,t){return n.addDoc(e,o({},t,{timestamp:n.serverTimestamp()}))},loginWithEmail:h,getDataQuery:function(e,t,r){try{var i=n.collection(s,e),c=n.query(i,n.where(t,"==",r));return Promise.resolve(n.getDocs(c)).then(function(e){var t=[];return e.forEach(function(e){t.push(o({},e.data(),{id:e.id}))}),t})}catch(e){return Promise.reject(e)}},getDataQuery2:function(e,t,r,i,c){try{var a=n.collection(s,e),u=n.query(a,n.where(t,"==",r),n.where(i,"==",c));return Promise.resolve(n.getDocs(u)).then(function(e){var t=[];return e.forEach(function(e){t.push(o({},e.data(),{id:e.id}))}),t})}catch(e){return Promise.reject(e)}},getCurrentUser:l,updateDocX:function(e,t,r){return n.updateDoc(n.doc(s,e,t),r)},deletDoc:f,getDataCollection:function(e){try{var t=n.collection(s,e);return Promise.resolve(n.getDocs(t)).then(function(e){var t=[];return e.forEach(function(e){t.push(o({},e.data(),{id:e.id}))}),t})}catch(e){return Promise.reject(e)}},getNotif:function(e,t){try{return Promise.resolve(l()).then(function(t){var r=n.collection(s,e),i=n.query(r,n.where("email","==",t.email),n.where("new","==",!0));n.onSnapshot(i,function(e){var t=[];e.forEach(function(e){t.push(o({id:e.id},e.data()))}),console.log(t)})})}catch(e){return Promise.reject(e)}},getDataSpecifict:function(e){try{return Promise.resolve(n.getDocs(e)).then(function(e){var t=[];return e.forEach(function(e){t.push(o({},e.data(),{id:e.id}))}),t})}catch(e){return Promise.reject(e)}},sendMessage:function(e,t,r){var o=n.collection(s,"chat",e,"message",t,"message"),i=n.doc(s,"chat",e,"message",t);n.addDoc(o,r),n.setDoc(i,{generate:(new Date).getTime()})},getMessage:function(e,t,r){var i=n.collection(s,"chat",t,"message",r,"message"),c=n.query(i,n.orderBy("timestamp"),n.limit(50));return n.onSnapshot(c,function(t){var r=[];t.forEach(function(e){r.push(o({},e.data(),{id:e.id}))}),e(r)})},getGrupMessage:function(e){try{return Promise.resolve(function(t,r){try{var o=(i=n.collection(s,"chat",e,"message"),Promise.resolve(n.getDocs(i)).then(function(e){var t=[];return e.forEach(function(e){try{return t.push(e.id),Promise.resolve()}catch(e){return Promise.reject(e)}}),t}))}catch(e){return r(e)}var i;return o&&o.then?o.then(void 0,r):o}(0,function(e){alert(e)}))}catch(e){return Promise.reject(e)}},onSignOut:function(){try{return Promise.resolve(t.signOut(a))}catch(e){return Promise.reject(e)}}}};
//# sourceMappingURL=index.cjs.map
