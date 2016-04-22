import {expect} from 'chai'
import test from 'ava'
import sinon from 'sinon'
import Rx from 'rx'
import child_process from 'child_process'
import process_actions from './process-actions'

var sandbox;

test.before(t => {
    // create a sandbox
    sandbox = sinon.sandbox.create();

    // stub some console methods
    sandbox.stub(child_process, "exec");
});
test.after('cleanup', t => {
    sandbox.restore();
});

test(async function() {

    const actions = ['echo test', 'echo test2'];
    
    await process_actions(actions);

    
        sinon.assert.calledOnce(child_process.exec);
        sinon.assert.calledWithExactly(child_process.exec, 'actions[i]');
    
});

