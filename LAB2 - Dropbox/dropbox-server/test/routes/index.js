describe('Task API Routes', function() {
    // This function will run before every test to clear database


    // In this test it's expected a task list of two tasks
    describe('GET /tasks', function () {
        it('returns a list of ', function (done) {
            request.get('/filelist?email="ramu919@gmail.com"')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.have.lengthOf(4);
                    done(err);
                });
        });
    });

    // Testing the save task expecting status 201 of success
});