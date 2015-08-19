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

  this.createEditForm = function(ev) {
      var li, edit_form, label;
      li = $(this).closest('li');
      label = li.find('label');

      //Append a clone of the edit_form_template to the <li>
      edit_form = $('#edit_form_template')
        .clone()
        .removeAttr('id')
        .removeClass('hidden');

      label.addClass('hidden');
      li.find('.btn-group').addClass('hidden');
      li.append(edit_form);
      edit_form.find('input[name=student_name]').val(label.text())
        .focus()
        .select();
  };

  this.removeEditForm = function(ev) {
    var li,edit_form, label;
    li = $(this).closest('li');
    label = li.find('label');

    edit_form = $(this).closest('form');
    edit_form.remove();

    label.removeClass('hidden');
    li.find('.btn-group').removeClass('hidden');
  };

  this.updateStudent = function(ev) {
    ev.preventDefault();
    var form = this;

    //Change the name on the student object
    //Grab the id of the updated student
    id = $(this).closest('li')
      .attr('data-id');

    //Find the student record with that id
    var student = Student.getStudentById(id);

    //Change it's name
    student.name = this.student_name.value;

    //Update label
    $(form).siblings('label').text(student.name);

    //Apply allows you to specify what "this" is. We're calling the current value of this in the other function.
    self.removeEditForm.apply(form);

    //Update localStorage
    self.save();

  }

  this.init = function() {
    self.students = [];
    Student.counter = 0;
    self.load();

    $(document).on('click', 'button.edit', self.createEditForm);
    $(document).on('click', 'button.cancel', self.removeEditForm);
    $(document).on('submit', 'form.edit', self.updateStudent);

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
