let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing Rest Api',() => {
    it('should do health check',(done) =>{
        chai
        .request('http://localhost:9900')
        .get('/')
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) => {
            throw err
        })
    })
    it('should do user url',(done) =>{
        chai
        .request('http://localhost:9900')
        .get('/user')
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) => {
            throw err
        })
    })
    it('Check post call',(done) =>{
        chai
        .request('http://localhost:9900')
        .post('/addUser')
        .send({"_id":5446,"name":"Zoe"})
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) => {
            throw err
        })
    })
})