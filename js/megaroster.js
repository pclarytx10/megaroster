var MegaRoster = function() {
  var self = this;

  this.save = function(){

    try {
      return (localStorage.students = JSON.stringify(self.students));
    }
    catch(err) {
      return false;
    }
  };

  this.load = function() {
    try {
      //Read in local storage, write to page
      self.students = JSON.parse(localStorage.students);
      $.each(self.students, function(index, student_name) {
        self.appendToList(student_name);
      });
    }
    catch(err) {
      return false;
    }
  };

  this.appendToList = function(student_name) {
    //Append studend name to <ol>
    $('#students').append('<li class="list-group-item">' + student_name + '</li>');
  };


  this.addStudent = function(student_name) {
    //Push the student name into the students array
    self.students.push(student_name);
    //Write existing list to local storage
    self.save();
    //Add the student name to a new list item in the <ol>
    self.appendToList(student_name);

  };

  this.init = function() {
    self.students = [];
    self.load();

    $('#new_student_form').on('submit',function(ev){
      ev.preventDefault();
      var student_name = $(this.student_name).val();

      self.addStudent(student_name);

      //Use the console to prove that the array has a new student
      //console.log(self.students);

      $(this.student_name).val('');
      $(this.student_name).focus();
    });
  };

};

var roster = new MegaRoster();
roster.init();
