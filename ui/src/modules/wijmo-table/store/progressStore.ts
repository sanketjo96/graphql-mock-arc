import { observable, action } from 'mobx';

export class TreeGridStoreProgress {
    @observable isProgressing = false;

    @action setProgress(status: boolean) {
        this.isProgressing = status;
    }
}

export const Progress =  new TreeGridStoreProgress();