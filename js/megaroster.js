var MegaRoster = function() {
  this.veggies = ['cabbage', 'brocolli'];

  this.init = function() {
    var self = this;
    this.students = [];

    $('#new_student_form').on('submit',function(ev){
      ev.preventDefault();
      var student_name = $(this.student_name).val();
      //Push the student name into the students array
      self.students.push(student_name);

      //Use the console to prove that the array has a new student
      //console.log(self.students);

      //Add the student name to a new list item in the <ol>
      $('#students').append('<li class="list-group-item">' + student_name + '</li>');
      $(this.student_name).val('');
      $(this.student_name).focus();
    });
  };

};

var roster = new MegaRoster();
roster.init();
