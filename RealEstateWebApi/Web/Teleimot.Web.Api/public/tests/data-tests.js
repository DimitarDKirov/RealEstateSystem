(function(){
    describe('Data layer tests', () => {
        const TEST_USERNAME = 'TEST-USERNAME',
           TEST_TOKEN = 'VERY-SECRET-TOKEN';

        function clearLocalStorage() {
            localStorage.removeItem("username");
            localStorage.removeItem("token");
        }

        beforeEach(clearLocalStorage);
        afterEach(clearLocalStorage);


        describe('Real estates tests', () => {
            describe('Get all real estates tests', () => {
                let requesterGetStub;

                beforeEach(() => {
                    requesterGetStub = sinon.stub(httpRequester, 'getJSON');
                });
                afterEach(() => {
                    requesterGetStub.restore();
                });


                it('expect realEstates to make a GET request', (done) => {
                    let page = 1;
                    requesterGetStub.returns(Promise.resolve({}));

                    data.realEstates.realEstates(page)
                    .then(() => {
                        expect(requesterGetStub).to.have.been.calledOnce;
                    })
                    .then(done, done);
                });

                it('Excpect realestates to make a request to correct URL', (done) => {
                    let page=1;
                    let expectedUrl = 'api/realestates/?skip=1';
                    requesterGetStub.returns(Promise.resolve({}));

                    data.realEstates.realEstates(page)
                    .then(() => {
                        expect(requesterGetStub.args[0][0]).to.equal(expectedUrl);
                    })
                    .then(done, done);
                });

                it('Excpect realestates to create proper authorization header', (done) => {
                    let page = 1;
                    localStorage.setItem("token", TEST_TOKEN);
                    let expectedOptions = {
                        headers: {
                            Authorization: 'Bearer ' + TEST_TOKEN
                        }
                    };

                    requesterGetStub.returns(Promise.resolve({}));

                    data.realEstates.realEstates(page)
                    .then(() => {
                        expect(requesterGetStub.args[0][1]).to.deep.equal(expectedOptions);
                    })
                    .then(done, done);
                });
            });
            describe('Real estate types tests', () => {
                let requesterGetStub;

                beforeEach(() => {
                    requesterGetStub = sinon.stub(httpRequester, 'getJSON');
                });
                afterEach(() => {
                    requesterGetStub.restore();
                });

                it('realEstateTypes should make a GET request', (done) => {
                    requesterGetStub.returns(Promise.resolve({}));

                    data.realEstates.realEstateTypes()
                    .then(() => {
                        expect(requesterGetStub).to.have.been.calledOnce;
                    })
                     .then(done, done);
                })
            });
        });

    });
}());