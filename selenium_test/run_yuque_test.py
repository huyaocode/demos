import os
import unittest

from package.HTMLTestRunner import HTMLTestRunner
from yuque.test_case.login import LogInTestDemo
from yuque.test_case.search import SearchTestDemo
from yuque.test_case.doclist import DoclistTestDemo

# 获取当前路径 方便后续报告的保存
dir = os.getcwd()
report_file = open(dir + "/yuque/report/report.html", "wb+")

login = unittest.TestLoader().loadTestsFromTestCase(LogInTestDemo)
search = unittest.TestLoader().loadTestsFromTestCase(SearchTestDemo)
doclist = unittest.TestLoader().loadTestsFromTestCase(DoclistTestDemo)

all_test = unittest.TestSuite([login, search, doclist])

runner = HTMLTestRunner(stream=report_file,
                        title="my test report",
                        description='smoke tests'
                        )
runner.run(all_test)
