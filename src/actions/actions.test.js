import {expect} from 'chai'
import actions from './actions'

describe('actions', () => {
    
    var semverType =  'minor';

    it('should define getActions method', () => {
        expect(actions).to.be.defined
        expect(actions(semverType)).to.be.a('array');
        expect(actions(semverType)).to.be.have.length(3);
    });

    it('should getActions from pkg.semver.pre', () => {
        
        const pkg = {
            semver : {
                pre : 'test'
            }
        }
        
        const result = actions(semverType, pkg);
        
        expect(result).to.be.a('array');
        expect(result).to.be.have.length(4);
        expect(result[0]).to.be.equal('test');
    });
    
    it('should getActions from pkg.semver.post', () => {
        
        const pkg = {
            semver : {
                post : 'test'
            }
        }
        
        const result = actions(semverType, pkg);
        
        expect(result).to.be.a('array');
        expect(result).to.be.have.length(4);
        expect(result[result.length - 1]).to.be.equal('test');
    });

   
});
