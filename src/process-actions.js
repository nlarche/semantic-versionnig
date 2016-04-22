import log from 'npmlog'
import Rx from 'rx';
import child_process from 'child_process';

const exec = Rx.Observable.fromNodeCallback(child_process.exec);

export default function process_action(actions, cancelActions) {
    return process_action(actions, logError);


    // onError
    function logError(err) {
        log.error(err);
        // execute delete actions
        process_action(cancelActions, function err() {
            log.error(err)
        });
    }

    // onNext
    function onNext(action) {
        if (action) {
            log.info(action);
        }
    }

    // onComplete
    function completed() {
        log.info('info Semantic versioning completed')
    }

    // run actions
    function process_action(actions, errorFn) {
        return Rx.Observable.for(actions, function(action) {
            log.info(action)
            return exec(action, {})
        })
        .subscribe(onNext, errorFn, completed);
    }
}