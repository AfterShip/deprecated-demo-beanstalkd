'use strict';

module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		eslint: {
			options: {
				configFile: '.eslintrc'
			},
			target: ['**/*.js', '!**/node_modules/**']
		},

		istanbul_check_coverage: {
			default: {
				options: {
					coverageFolder: 'coverage'
				}
			}
		},

		mocha_istanbul: {
			coverage: {
				src: ['test/**.js'],
				options: {
					coverage: true,
					reporter: 'spec'
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-eslint');

	// Default task.
	grunt.registerTask('default', []);

	grunt.registerTask('lint', ['eslint']);
};
