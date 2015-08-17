var Megatask = {
  author: "Davey",
  hisDeal: "Who knows?",
  newStudentForm: $('#new_student_form'),//This is equiv to getElementById.
  submitHandler: function() {
    alert("What!")
  },
  start: function(ev){
    this.newStudentForm.submit(this.submitHandler);
  }
};

Megatask.start();

var foods = {
  fruits: ['apples','oranges','banannas'],
  veggies: ['broccoli','celery','kale'],
  favorite: 'spagetti'
};
