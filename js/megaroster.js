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
      var student_data_objects = JSON.parse(localStorage.students);
      $.each(student_data_objects, function(index, student_data) {
        var student = new Student();
        student.init(student_data);
        student.appendToList();
        self.students.push(student);
      });
    }
    catch(err) {
      return false;
    }
  };

  // this.appendToList = function(student_name) {
  //   //Grab the *template* list item from the page
  //   var li = $('#list_item_template').clone();
  //   li.removeAttr('id')
  //     .addClass('student')
  //     .prepend(student_name)
  //     .removeClass('hidden');
  //
  //   //Append studend name to <ol>
  //
  //   $('#students').append(li);
  // };


  this.addStudent = function(student_name) {
    var student = new Student();
    student.init({
      name: student_name,
      //id: id
    });

    //Push the student name into the students array
    self.students.push(student);

    //Add the student name to a new list item in the <ol>
    student.appendToList();

    //Write existing list to local storage
    self.save();

  };

  this.init = function() {
    self.students = [];
    Student.counter = 0;
    self.load();

    $(document).on('click', 'button.delete', function(ev) {
      var li = $(this).closest('li');
      //Remove item from the array
      var id = li.attr('data-id');


      $.each(self.students, function(index, current_student) {
        if (current_student.id.toString() === id.toString()) {
          self.students.splice(index, 1);
          return false;
        }
      });

      //Remove item from the <ol>
      li.remove();

      //Update localStorage
      self.save();

    });


    $('#new_student_form').on('submit',function(ev){
      ev.preventDefault();
      var student_name = $(this.student_name).val();

      self.addStudent(student_name);

      //Use the console to prove that the array has a new student
      //console.log(self.students);

      $(this.student_name).val('')
        .focus();
    });
  };

};

var roster = new MegaRoster();
roster.init();
