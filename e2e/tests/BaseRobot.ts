import BaseActions from './BaseActions';
import BaseExpects from './BaseExpects';

class BaseRobot {
    actions: BaseActions;
    expects: BaseExpects;

    constructor() {
        this.actions = new BaseActions();
        this.expects = new BaseExpects();
    }
}

export default BaseRobot;