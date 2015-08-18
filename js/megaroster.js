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
    //Grab the *template* list item from the page
    var li = $('#list_item_template').clone();
    li.removeAttr('id')
      .addClass('student')
      .prepend(student_name)
      .removeClass('hidden');

    //Append studend name to <ol>

    $('#students').append(li);
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

    $('button.delete').on('click', function(ev){
      //Remove item from the array
      //Remove item from the <ol>
      $(this).closest('li').remove();

      //Update localStorage

    });


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
