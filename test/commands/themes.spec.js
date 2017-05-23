const should = require('should');
const rewire = require('rewire');
const sinon = require('sinon');

const themes = rewire('../../src/commands/themes');

describe('themes command', () => {
  it('should retrieve a module', () => {
    should.exist(themes);
  });

  it('shouldn\' throw errors when valid subcommands are passed', () => {
    should.doesNotThrow(() => {
      themes.options.validateArgs(['list']);
    });
  });

  it('should throw errors when valid theme id is not passed to sync subcomand', () => {
    should.throws(() => {
      themes.options.validateArgs(['sync']);
    });
  });

  it('should throw errors when valid theme id is not passed to download subcomand', () => {
    should.throws(() => {
      themes.options.validateArgs(['download']);
    });
  });

  it('should throw errors when invalid subcommands are passed', () => {
    should.throws(() => {
      themes.options.validateArgs(['invalid']);
    });
  });

  it('should throw errors when no subcommands are passed', () => {
    should.throws(() => {
      themes.options.validateArgs([]);
    });
  });

  it('`theme download {id}` should call download service', () => {
    const themeId = 12;
    const generatorService = {
      download: receivedThemeId => should(receivedThemeId).equal(themeId),
    };
    themes.__set__('generatorService', generatorService);
    should.doesNotThrow(() => {
      themes.run(['download', themeId]);
    });
  });

  it('`theme sync {id}` should call download service', () => {
    const themeId = 12;
    const syncService = {
      run: receivedThemeId => should(receivedThemeId).equal(themeId),
    };
    themes.__set__('syncService', syncService);
    should.doesNotThrow(() => {
      themes.run(['sync', themeId]);
    });
  });

  it('`theme sync {id}` should call sync service', () => {});

  it('should be able to execute the `theme list` successfuly', () => {
    const print = sinon.spy(() => {});
    const data = [{
      id: 1,
      name: 'hello world',
    }];
    const themeService = {
      get: sinon.spy((callback) => {
        callback(null, data);
      }),
    };

    themes.__set__('print', print);
    themes.__set__('themeService', themeService);
    themes.run(['list']);
    print.calledOnce.should.be.true();
  });

  it('should be fail gracefully when hitting the server goes wrong', () => {
    const print = sinon.spy(() => {});
    const themeService = {
      get: sinon.spy((callback) => {
        callback('Something went wrong');
      }),
    };

    themes.__set__('print', print);
    themes.__set__('themeService', themeService);
    themes.run(['list']);
    print.calledWithMatch(/Something went bananas/).should.be.true();
    print.calledOnce.should.be.true();
  });
});
