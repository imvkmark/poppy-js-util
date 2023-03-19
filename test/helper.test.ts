import { deviceId, toFloat } from '../src/index';
import { describe, expect, it } from 'vitest'


describe('Math', function () {
    it('toFloat', function () {
        expect(toFloat('haha', 0)).to.equal('0.00');
        expect(toFloat('0.235', 2)).to.equal('0.23');
    });
    it('DeviceId:' + deviceId(), function () {
        expect(deviceId()).to.be.a('string');
    });
});

