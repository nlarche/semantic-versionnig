import {expect} from 'chai'
import options from './options'

describe('options', () => {

    it('should define getOptions method', () => {
        expect(options).to.be.defined
        expect(options()).to.be.a('array');
        expect(options()).to.be.have.length(0);
    });

    it('should getOptions from string', () => {
        const result = options('test');
        expect(result).to.be.a('array');
        expect(result).to.be.have.length(1);
        expect(result[0]).to.be.equal('test');
    });

    it('should getOptions from array', () => {
        const result = options(['test', 'test1']);
        expect(result).to.be.a('array');
        expect(result).to.be.have.length(2);
        expect(result[0]).to.be.equal('test');
        expect(result[1]).to.be.equal('test1');
    });

    it('should getOptions from object', () => {
        const result = options({test: 'test', test1: 'test1' });
        expect(result).to.be.a('array');
        expect(result).to.be.have.length(2);
        expect(result[0]).to.be.equal('test');
        expect(result[1]).to.be.equal('test1');
    });
});
