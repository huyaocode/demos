#encoding utf-8
from selenium import webdriver 
from selenium.webdriver.common.by import By
import unittest,time
import ddt
import xlrd

test_url = "https://www.yuque.com/yuque/help/puqqw3"
test_data_file = "yuque/data/doclist_info.xlsx"


def get_xldata(file_name):
    rows=[] 
    book=xlrd.open_workbook(file_name) 
    sheet=book.sheet_by_index(0)
    for row_idx in range(1, sheet.nrows):
        rows.append(list(sheet.row_values(row_idx,0,sheet.ncols))) 
    print(rows)
    return rows

@ddt.ddt
class DoclistTestDemo(unittest.TestCase):
    @classmethod
    def setUpClass(self): 
        self.driver = webdriver.Firefox()
        self.driver.get(test_url)

    @ddt.data(*get_xldata(test_data_file)) 
    @ddt.unpack
    def test_dataDrienByObj(self, doc_title, doc_content):
        try:
            self.driver.implicitly_wait(3)
            self.driver.find_element(By.PARTIAL_LINK_TEXT, doc_title).click()
            time.sleep(1)
            # 滚动页面
            for i in range(10):
                js = 'window.scrollTo(0,' + str(20*i) + ')'
                self.driver.execute_script(js)
                time.sleep(0.05)
            # 验证是否找到
            self.assertTrue(doc_content in self.driver.page_source)
        except Exception as e:
            print(e)
            self.assertTrue(False)

    @classmethod
    def tearDownClass(self): 
        self.driver.quit() 

if __name__=='__main__':
    unittest.main()
